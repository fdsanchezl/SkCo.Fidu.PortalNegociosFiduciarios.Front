import { ICellEditorComp, ICellEditorParams } from 'ag-grid-community';
import Ajv from 'ajv';
import { updateNestedField, validRules } from './ag-grid.utils';
export class NumberCellEditor implements ICellEditorComp {
  private eInput!: HTMLInputElement;
  private params!: ICellEditorParams;
  private ajv = new Ajv({ allErrors: true });
  private validate!: any;
  private schema!: any;
  private lastValidValue!: number;
  isInvalid: boolean = false;

  init(params: ICellEditorParams): void {
    this.params = params;
    this.eInput = document.createElement('input');
    this.eInput.type = 'number';
    this.eInput.value = params.value ?? '';
    this.eInput.classList.add('ag-input');
    this.eInput.style.width = '100%';
    this.eInput.style.height = '100%';
    this.eInput.style.border = '1px solid var(--gray-color)'
    this.isInvalid = false;
    
    const initialValue = params.value ? parseFloat(this.eInput.value) || 0 : 0;
    this.eInput.value = initialValue.toString();
    this.lastValidValue = initialValue;
    
    this.schema = params.colDef?.cellEditorParams?.schema || {};
    this.compileSchema();

    this.eInput.addEventListener('input', () => this.validateInput());

  }

  isCancelAfterEnd(): boolean {
    return this.isInvalid;
  }

  getGui(): HTMLElement {
    return this.eInput;
  }

  getValue(): any {
    return this.isInvalid ? this.lastValidValue : this.eInput.value.toString().trim();
  }

  afterGuiAttached?(): void {
    this.eInput.focus();
  }

  private compileSchema(): void {
    if (typeof this.schema !== 'object' && typeof this.schema !== 'boolean') {
        console.error('Schema inválido:', this.schema);
        throw new Error('El esquema debe ser un objeto o un booleano');
    }
    try {
      this.validate = this.ajv.compile(this.schema);
    } catch (error) {
      console.error('Error compilando el esquema JSON:', error);
      this.validate = () => true;
    }
  }
  private validateInput(): void {
    const value = parseFloat(this.eInput.value);

    this.params.data[this.params.colDef?.field as string] = value; // Actualizar el objeto

    const validationData = updateNestedField(this.params.data, this.params.colDef?.field as string, value);
    const errorRules = validRules(this.schema, this.params.colDef?.field as string, this.params);
    
    this.validate(validationData);
    let errors: any[] = this.validate?.errors || [];
    errors = errors.filter((err: any) => err?.dataPath.includes(this.params.colDef.field)) || [];

    if (errorRules.length > 0 || errors.length > 0) {
      this.isInvalid = true;
      this.eInput.style.border = '2px solid red';

      let errorMessages = errors
        ?.map((err: any) => `${err.instancePath || 'Valor inválido'}: ${err.message}`)
        .join('\n') || 'Valor no válido';
      errorMessages = errorRules.length > 0 ? `${errorMessages}\n${errorRules.map((rule: any) => rule.message).join('\n')}` : errorMessages;

      this.eInput.setAttribute('title', errorMessages);
      this.eInput.setCustomValidity(errorMessages);
      this.lastValidValue = value;
    } else {
      this.isInvalid = false;
      this.eInput.style.border = '';
      this.eInput.removeAttribute('title');
      this.eInput.setCustomValidity('');
      this.eInput.style.border = '1px solid var(--primary-color)';

      // ✅ Solo aquí guardamos el último valor válido
      this.lastValidValue = value;
      // Notificar al componente los cambios
    }

  }
}