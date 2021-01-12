import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {

    constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

    public open(message, action = 'X', duration = 5000) {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration,
                verticalPosition: 'bottom',
                horizontalPosition: 'end',
                panelClass: ['red-snackbar'],
            });
        });
    }
}
