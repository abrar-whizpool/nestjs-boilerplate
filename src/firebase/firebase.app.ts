import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class FireBaseApp {
  private AdminApp: admin.app.App;

  admin() {
    return this.AdminApp.auth();
  }
  async deleteUser(uid: string): Promise<boolean> {
    getAuth();

    return admin
      .auth()
      .deleteUser(uid)
      .then(() => { return true; })
      .catch((error) => { throw new HttpException(error.message, HttpStatus.BAD_REQUEST) });
  }

  async signUp(email: string, password: string): Promise<UserRecord> {
    getAuth();

    return admin
      .auth()
      .createUser({ email, password })
      .then(async (userCredential) => userCredential)
      .catch((error) => { throw new HttpException(error.message, HttpStatus.BAD_REQUEST) });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential)
      .catch((error) => { throw new HttpException(error.message, HttpStatus.BAD_REQUEST) });
  }
}
