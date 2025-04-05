import { Injectable } from '@angular/core';
import { User } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  protected override endpoint = 'users';
}
