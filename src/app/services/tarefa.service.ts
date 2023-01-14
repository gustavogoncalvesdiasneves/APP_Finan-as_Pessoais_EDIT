import { Injectable } from '@angular/core';
import { IonItem } from '@ionic/angular';
//import { callbackify } from 'util';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: any[] = [];
  key = 'tarefaCollection';
  constructor() {}

  salvar(tarefa: any, callback = null) {
    tarefa.feito = false;

    //obter o localstorage

    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      let collection: any[] = JSON.parse(value);
      collection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    //if (callback!=null){
    //callback();

    //}
  }

  listar() {
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return [];
    }

    let collection: any[] = JSON.parse(value);
    return collection;
  }

  delete(tarefa: any, callback = null) {
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return;
    }

    let collection: any[] = JSON.parse(value);

    let resultCollection = collection.filter((item) => {
      return item.tarefa != tarefa.tarefa;
    });

    localStorage.setItem(this.key, JSON.stringify(resultCollection));

    //if (callback!=null){
    //callback();
    //}
  }

  atualizar(tarefa: any, callback = null) {
    //obter o localstorage

    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);

      collection.forEach((item) => {
        if (item.tarefa == tarefa.tarefa) {
          item.feito = tarefa.feito;
        }
      });

      localStorage.setItem(this.key, JSON.stringify(collection));
    }
  }

  editar(tarefa: any, status: any, item: any, callback = null) {
    let value: any = localStorage.getItem(this.key);

    //let collection: any[] = JSON.parse(value);

    let notesEdit: any[] = JSON.parse(value);

    notesEdit = notesEdit.filter((item) => item.tarefa != tarefa.tarefa);

    notesEdit.push({
      tarefa: tarefa,
      feito: status,
    });
    localStorage.setItem(this.key, JSON.stringify(notesEdit));
  }
}
