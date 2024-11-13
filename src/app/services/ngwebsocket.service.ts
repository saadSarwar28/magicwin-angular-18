import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { _window } from './backend.service'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NgwebsocketService {
  private readonly _http: HttpClient;
  private readonly _baseUrl: string = _window().signalr;
  private hubConnection: HubConnection | undefined;
  messages: Subject<string> = new Subject();

  constructor(http: HttpClient, private storageService: StorageService) {
    this._http = http;
  }


  init() {
    const token = this.storageService.secureStorage.getItem('token');
    if (!token) {
      return;
    }
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this._baseUrl}`)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.hubConnection.start().catch((err) => console.error(err));

      this.hubConnection.on("GetLine", (data: any) => {
        this.messages.next(data);
      });
    }
  }

}
