import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Controller('country')
@ApiTags('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Post()
  create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll(): Promise<Country[]> {
    return this.countryService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Country> {
    return this.countryService.findOne({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<UpdateResult> {
    return this.countryService.update({ id }, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.countryService.remove({ id });
  }
}
