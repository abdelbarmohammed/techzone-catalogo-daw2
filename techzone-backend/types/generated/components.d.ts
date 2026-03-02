import type { Schema, Struct } from '@strapi/strapi';

export interface BeneficiosBeneficios extends Struct.ComponentSchema {
  collectionName: 'components_beneficios_beneficios';
  info: {
    displayName: 'beneficios';
  };
  attributes: {};
}

export interface EstadisticasEstadisticas extends Struct.ComponentSchema {
  collectionName: 'components_estadisticas_estadisticas';
  info: {
    displayName: 'estadisticas';
  };
  attributes: {};
}

export interface InicioBeneficio extends Struct.ComponentSchema {
  collectionName: 'components_inicio_beneficios';
  info: {
    displayName: 'Beneficio';
    icon: 'check';
  };
  attributes: {
    descripcion: Schema.Attribute.String;
    icono: Schema.Attribute.Enumeration<
      ['truck', 'shield', 'refresh', 'headphones', 'star', 'clock']
    > &
      Schema.Attribute.Required;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface InicioEstadistica extends Struct.ComponentSchema {
  collectionName: 'components_inicio_estadisticas';
  info: {
    displayName: 'Estadistica';
    icon: 'chartLine';
  };
  attributes: {
    etiqueta: Schema.Attribute.String & Schema.Attribute.Required;
    numero: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'beneficios.beneficios': BeneficiosBeneficios;
      'estadisticas.estadisticas': EstadisticasEstadisticas;
      'inicio.beneficio': InicioBeneficio;
      'inicio.estadistica': InicioEstadistica;
    }
  }
}
