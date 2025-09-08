
import * as jmespath from 'jmespath';

export const updateNestedField =  (record: any, fieldPath: string, value: any) => {
    const keys = fieldPath.split('.'); // Dividir el path: "payer.name" -> ["payer", "name"]
    let current = record;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            // Último nivel: Asignar el valor
            current[key] = value;
        } else {
            // Nivel intermedio: Crear objeto si no existe
            current[key] = current[key] || {};
            current = current[key];
        }
    });
    return record; // Retornar el registro completo actualizado
}

export const validRules = (schema: any, field: string, params: any): any => {
  const rules = schema.rules;
  if (rules) {
    const data = params.data;
    return rules
      .map((rule: any) => {
        if (rule.property !== field) return { validation: true, message: '' };
        const value = jmespath.search(data, rule.rule);
        return { validation: value, message: rule.message };
      })
      .filter((rule: any) => !rule.validation);
  }
  return [];
}