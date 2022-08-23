import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.css'],
})
export class AutocompleteDropdownComponent implements OnInit {
  @Input() label = ''; // Form label
  @Input() items = []; // Array of data
  @Input() target = ''; // Child value
  @Input() disabled: boolean; // Child value
  @Input() required: boolean; // Child value
  @Input() formCheck: boolean; // Child value
  @Input() selectedItem = ''; // Item selected by user
  @Output() selection = new EventEmitter(); // Emitter to send the data back to the user
  @Output() clear = new EventEmitter(); // Emitter to send the data back to the user
  myControl: FormControl = new FormControl();
  allOptions: string[] = this.items; // there are thousands of options
  filteredOptions: Observable<string[]>; // Array of filtered data
  constructor(private commonS: CommonService) {}

  ngOnInit() {
    if (this.required) {
      console.log('required', this.required);
      this.myControl.setValidators(Validators.required);
    }
    // If items are empty
    if (!this.items.length) {
      // this.logger.log('No items loaded', this.items);
    }

    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        map((val) => this.filter(val))
      );
    }, 500);
  }

  filter(val: string): string[] {
    // this.logger.log('items', this.items);
    if (val !== null && val !== undefined) {
      if (this.target !== null) {
        return this.items.filter(
          (option) =>
            option[this.target].toLowerCase().indexOf(val.toLowerCase()) === 0
        );
      } else {
        return this.items.filter(
          (option) => option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        );
      }
    }
  }

  // Output selected item back to component
  itemSelected(item) {
    console.log(item[this.target], 'selected');
    this.selection.emit(item);
  }

  clearInput() {
    this.selectedItem = '';
    console.log('Cleared');
    this.clear.emit(true);
  }
}
