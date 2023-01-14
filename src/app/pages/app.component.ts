import { Component, VERSION, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from '../services/tarefa.service';
//import { AppComponent } from './app.component'
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  tarefaCollection: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController,
    //private localNotifications: LocalNotifications, //private vibration: Vibration
  ) {}

  async ngOnInit(){
    await LocalNotifications.requestPermission()
  };

  async ScheduleBasic (){
    await LocalNotifications.schedule({
      Notifications:[
        {
          title: 'Teste',
          body: 'teste Body',
          id: 1,
          extra: {
            data: 'An Extra Data'
          },
          iconColor: "#000FF",
        }
        
      ]
    });

  }

  ionViewDidEnter() {
    this.listarTarefa();
  }

  listarTarefa() {
    this.tarefaCollection = this.tarefaService.listar();
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'informe a tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          },
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.salvar(tarefa);
            this.handleRefresh(event);
            //()=> {
            //this.listarTarefa();
            //}
          },
        },
      ],
    });

    await alert.present();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.tarefaService.listar();
      this.listarTarefa();
      event.target.complete();
    }, 800);
  }

  delete(item: any) {
    this.tarefaService.delete(item);
    //this.handleRefresh(event);
    this.listarTarefa();
  }

  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'OQUE DESEJA FAZER ?',
      buttons: [
        {
          text: tarefa.feito ? 'Marcar como Pendente' : 'Marcar como Realizado',
          icon: tarefa.feito ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            tarefa.feito = !tarefa.feito;

            this.tarefaService.atualizar(tarefa);
            this.listarTarefa(); //Pegar como base Edit
          },
        },
        {
          text: 'cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async editData(item: any) {
    //this.tarefaService.editar(item);

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          value: item.tarefa,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          },
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.editar(tarefa.tarefa, item.feito, item);
            this.tarefaService.delete(item);
            //this.tarefaService.salvar(tarefa); (ativar caso não funcione)
            this.handleRefresh(event);
            //()=> {
            //this.listarTarefa();
            //}
          },
        },
      ],
    });

    await alert.present();
  }
}
