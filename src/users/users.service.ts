import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'name1',
      email: 'email1@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'name2',
      email: 'email2@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'name3',
      email: 'email3@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'name4',
      email: 'email4@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'name5',
      email: 'email5@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'name6',
      email: 'email6@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    } else {
      return this.users;
    }
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
