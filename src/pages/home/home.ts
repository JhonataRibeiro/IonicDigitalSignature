import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileChooser } from '@ionic-native/file-chooser';

declare var PDFDigiSign: any;
declare var KeySelector: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AndroidPermissions, FileChooser]
})
export class HomePage {

    public uri:string;
    public imageData = "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"

    constructor(platform: Platform, private androidPermissions: AndroidPermissions, private fileChooser: FileChooser) {
        platform.ready().then(() => {

            this.androidPermissions.requestPermissions(
                [
                    this.androidPermissions.PERMISSION.USE_CREDENTIALS,
                    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
                    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
                ]
            ).then((data) => console.log("permission", data)).catch(error => console.log(error));

           


        });
    }

open(){
    this.fileChooser.open()
    .then(uri => {
        this.uri = uri.replace("file://", "")
        this.teste()
    })
    .catch(e => console.log(e));
}

    teste() {
        KeySelector.select("erik", (sucess) => {
            console.log("sucess in keyselector", sucess)
            let cert = JSON.parse(sucess)
            PDFDigiSign.signWithAlias(this.uri, cert.alias, "Erik", "Brasilia", "assinando consulta", this.imageData, 1, 0, 0, 100, 100, (response) => {
                console.log("voltou 1", response)
            }, (error) => {
                console.log("voltou 2", error);

            });
        }, (error) => { console.log("error in keyselector", error) })

    }


}
