const BASIC_ROUTES = ['/', 'login', '', 'home'];

export const authorizations: IAuthorizations = {
  DELIVERY_MANAGER: [
    ...BASIC_ROUTES,
    'resources',
    'hiring-request',
    'service-map',
    'services-configuration',
  ],
  JEFE_DE_PROYECTO: [...BASIC_ROUTES, 'service-map', 'services-configuration'],
  JEFE_DE_RECURSOS_HUMANOS: [
    ...BASIC_ROUTES,
    'resources',
    'contract-imbox',
    'contract-imbox/approveHiringRequestComponent',
    'period-administration',
    'create-period',
    'update-period',
  ],
  GERENTE_GENERAL: [
    ...BASIC_ROUTES,
    'resources',
    'contract-imbox',
    'contract-imbox/approveHiringRequestComponent',
  ],
  ANALYST: [],
  JEFE_DE_SERVICIOS: [
    ...BASIC_ROUTES,
    'resources',
    'hiring-request',
    'service-map',
    'services-configuration',
  ],
};

export interface IAuthorizations {
  DELIVERY_MANAGER: string[];
  JEFE_DE_PROYECTO: string[];
  JEFE_DE_RECURSOS_HUMANOS: string[];
  GERENTE_GENERAL: string[];
  ANALYST: string[];
  JEFE_DE_SERVICIOS: string[];
}
