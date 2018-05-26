import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
    constructor(private ns: NotificationService,
        private injector: Injector,
        private ngZone: NgZone) {
        super();
    }
    public handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            this.ngZone.run(() => {
                switch (errorResponse.status) {
                    case 0:
                        this.ns.notify(message ||
                            'Serviço não autorizado(CORS) ou falha HTTPS do navegador');
                        break;
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado.');
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado.');
                        break;
                    case 500:
                        this.ns.notify(message || 'Servidor não encontrado');
                        break;
                }
            });
        }
        super.handleError(errorResponse);
    }
}
