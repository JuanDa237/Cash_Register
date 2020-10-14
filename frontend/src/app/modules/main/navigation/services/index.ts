import { NavigationService } from './navigation.service';
import { UsersService } from './user.service';

export const services = [
    NavigationService,
    UsersService
];

export * from './navigation.service';
export * from './user.service';