import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryEntity: Repository<Country>,
  ) { }
  create(createCountryDto: CreateCountryDto): Promise<Country> {

    return this.countryEntity.save(createCountryDto);
  }

  findAll(options: FindManyOptions<Country>): Promise<Country[]> {
    return this.countryEntity.find(options);
  }

  findOne(options: FindOneOptions<Country>): Promise<Country> {
    return this.countryEntity.findOne(options);
  }

  update(options: FindOptionsWhere<Country>, updateCountryDto: UpdateCountryDto): Promise<UpdateResult> {
    return this.countryEntity.update(options, updateCountryDto);
  }

  remove(options: FindOptionsWhere<Country>): Promise<UpdateResult> {
    return this.countryEntity.softDelete(options);
  }
}
