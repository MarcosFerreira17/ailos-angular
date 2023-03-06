import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Account } from '../../../models/Account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  firstCheckBox: string = '';
  secondCheckBox: string = '';
  thirdCheckBox: string = '';
  isCollapsedCPF = true;
  validCPF = true;
  cpf: string = '';
  accounts: Account[] = [
    {
      type: 'Conta Corrente',
      number: '778461-8',
    },
    {
      type: 'Conta Aplicação',
      number: '557932-4',
    },
  ];

  users: User[] = [
    {
      name: 'Mariane de Sousa Oliveira',
      cpf: '46680074800',
      status: 'Regular',
      accounts: [
        {
          type: 'Conta Corrente',
          number: '778461-8',
        },
        {
          type: 'Conta Aplicação',
          number: '557932-4',
        },
      ],
    },
  ];

  public ngOnInit(): void {}

  searchCPF(cpf: string) {
    if (this.isValidCPF(cpf)) {
      const user = this.users.find((u) => u.cpf === cpf);
      return user ? [user] : null;
    }
    return null;
  }

  isChecked() {
    const primaryCheck = document.querySelector(
      '#primaryCheck'
    ) as HTMLInputElement;
    const secondaryCheck = document.querySelector(
      '#secondaryCheck'
    ) as HTMLInputElement;
    const thirdCheck = document.querySelector(
      '#thirdCheck'
    ) as HTMLInputElement;
    this.firstCheckBox = primaryCheck.checked ? 'checked' : 'unchecked';
    this.secondCheckBox = secondaryCheck.checked ? 'checked' : 'unchecked';
    this.thirdCheckBox = thirdCheck.checked ? 'checked' : 'unchecked';
  }

  isValidCPF(cpf: string) {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return (this.validCPF = false);
    }
    var sum = 0;
    var rest;
    for (var i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (var i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) return false;
    return (this.validCPF = true);
  }
}
