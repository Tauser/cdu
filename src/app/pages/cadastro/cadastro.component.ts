import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CadastroComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        instituicao: ['', [Validators.required]],
        atividadePrincipal: ['', [Validators.required]],
        formacao: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmacaoSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmacaoSenha = group.get('confirmacaoSenha')?.value;
    return senha === confirmacaoSenha ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      console.error('Formulário inválido');
    }
  }
}
