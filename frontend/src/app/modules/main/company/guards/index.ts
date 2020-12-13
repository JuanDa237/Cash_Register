import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { RoleToCompanyGuard } from './roleToCompany.guard';

export const guards = [AuthGuard, RoleGuard, RoleToCompanyGuard];

export * from './auth.guard';
export * from './role.guard';
export * from './roleToCompany.guard';
