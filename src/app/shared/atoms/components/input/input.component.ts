import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ValidFormControlModel } from '../../../../modules/core/domain/valueObject/validFormControlModel';
import {
	FormBuilder,
	FormControl,
} from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	@Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
	@Input() inputControl!: FormControl;
	@Input() name: string = 'Input';
	@Input() placeHolder: string = 'Input';
	@Output() inputData: EventEmitter<ValidFormControlModel<number>> =
		new EventEmitter();
	constructor(private $builder: FormBuilder) {}

	ngOnInit(): void {
		this.$builder.control(this.inputControl);
	}



	public get errorMessage(): string {
		if (this.inputControl.hasError('max'))
			return `the maximum amount is $${
				this.inputControl.getError('max')['max']
			}`;
		if (this.inputControl.hasError('min'))
			return `the minimun amount is $${
				this.inputControl.getError('min')['min']
			}`;
		if (this.inputControl.hasError('required'))
			return `The amount is required`;

		return '';
	}

	public get isInvalidFiel(): boolean {
		return this.inputControl?.touched && this.inputControl?.invalid;
	}

	validateInput(event: any) {
		this.inputData.emit({
			valid: this.inputControl.valid,
			value: this.inputControl.value,
		});
	}
}
