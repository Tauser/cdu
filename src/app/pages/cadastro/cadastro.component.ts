import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
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
        formacao: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmacaoSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
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
