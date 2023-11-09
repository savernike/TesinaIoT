# TesinaIoT
Repository per progetto IoT
## Materiale
Le componenti elettroniche utilizzate per la realizzazione del progetto assegnatoci sono: 
- Raspberry Pi 3A+, un device non-constrained che funge da LWM2M Server
- ESP-32-WROOM-32, un device constrained che rappresenta il LWM2M Client

## Prerequisiti
Questi sono i prerequisiti necessari per il corretto funzionamento della tesina
### Installazione Raspberry Pi OS
Per poter utilizzare correttamente il Raspberry Pi 3A+, è necessario installare il sistema operativo Raspberry Pi OS. 
Per fare ciò, scaricare l'ultima release dal sito ufficiale al seguente link: 
```
https://www.raspberrypi.com/software/
```
Scaricare il file compatibile con il sistema operativo del computer attualmente in uso e seguire le istruzioni del sito di Raspberry per installare l'immagine su una Micro SD (in quanto questo modello prevede solo uno slot per l'OS del Raspberry).

### Driver per porte COM-USB
In caso non dovessero essere presenti, è necessario scaricare i driver per utilizzare le porte COM dal seriale USB. 
Il driver viene incluso nella repository corrente o comunque scaricabile dal sito ufficiale al seguente link:
```
https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads
```
### Rete wireless
Per effettuare le comunicazioni client-server, è necessario usufruire di una rete Wi-Fi a 2.4GHz di cui si conoscono SSID e password: la frequenza prima indicata è dovuta dal fatto che l'ESP-32 sopra descritto non riesca ad associarsi ad una rete Wi-Fi con frequenza di 5GHz.

Potrebbe essere, inoltre, necessario poter aprire le port 5683 e 56830 del router: queste ultime serviranno per far comunicare client e server utilizzando il protocollo CoAP (anche se in tutti i codici che vedremo successivamente è possibile definire le port di comunicazione in maniera dinamica).

### Software necessari per lo sviluppo
Per facilitare la scrittura del codice usato nei passi successivi, si consiglia di scaricare: 
1. Arduino IDE (versione 2.2.1 o successive)
2. Visual Studio Code (con successiva installazione del plugin PlatformIO per caricare il codice eseguibile su ESP-32) 

### Installazione CMake
Per l'utilizzo di alcune delle librerie sotto citate, è necessario scaricare CMake sul Raspberry Pi e sul computer che si sta utilizzando, al fine di poter effettuare le compilazioni del codice C in maniera cross-platform.

## Librerie CoAP usate
Le librerie qui elencate sono state scelte dopo una serie di confronti e risultate essere più consone all'obiettivo finale.
### Thing.CoAP
La libreria può essere scaricata qui di seguito o alla seguente repository GitHub: 
```
https://github.com/Alv3s/Thing.CoAP  
```
Questa libreria permetterà di programmare un CoAP client sull'ESP-32.
Seguire i seguenti passi per importare la libreria su Arduino:
1. Aprire Arduino IDE
2. Andare su ```Sketch -> Include Library -> Add Zip Library```
3. Cercare il percorso in cui si è scaricata la libreria e cliccare apri
4. Riavviare Arduino IDE
5. Verificare che la libreria sia presente andando su ```File -> Examples```: qui sarà presente Thing.CoAP tra gli Examples of Custom Libraries

Così facendo, sarà possibile utilizzare gli examples della libreria direttamente da Arduino IDE.
### node-coap
Prerequisito unico per poter utilizzare questa libreria sul server (Raspberry Pi) è installare NodeJS. 
Per farlo, aprire una shell e digitare
```
sudo apt install nodejs
```
Una volta fatto ciò, verificare che l'installazione sia andata a buon fine digitando
```
nodejs --version
```
```
npm --version 
```
Se per entrambi i comandi è possibile verificare la versione, scaricare la libreria node-coap utilizzando il seguente comando 
```
npm install coap
```
### Test delle librerie CoAP
Per svolgere il test sulle librerie scelte, andare ad utilizzare i codici così come segue.

#### Caricare codice sul Server
Aprire Arduino IDE ed andare su ``` File-> Examples-> Thing.CoAP-> ESP-32-> Server-InlineEndpoints```

Verrà caricato il codice di esempio della libreria sulla finestra dell'IDE: questo inizializzerà un server CoAP con le risorse /Button (accessibile via richiesta GET) e /LED (accessibile via richieste GET o POST).

Andare quindi a modificare l'SSID e la password della rete Wi-Fi precedentemente predisposta.

Caricato il codice ed effettuate le seguenti modifiche, collegare l'ESP32 al computer tramite la porta COM designata e selezionare il modulo ESP32-WROOM-DA Module, dopodiché andare ad effettuare l'Upload del codice sul device constrained.

Terminato l'upload con successo, aprire il Serial Monitor dall'IDE, selezionare il baud rate a 115200 e verificare se si connette alla rete: in caso di esito positivo, verrà mostrato l'indirizzo IP nel Serial Monitor.

#### Caricare codice sul Client
Sul Raspberry Pi, andare a copiare il codice JavaScript ```Librerie CoAP/client.js```

Successivamente, andare ad eseguire nello stesso percorso in cui è stato copiato il file ```client.js``` il seguente comando:
```
node client.js
```
Sostituire ```<<your_ip>>``` con l'indirizzo IP ottenuto in precedenza nel Serial Monitor di Arduino.

Così facendo, verrà inizializzato un client CoAP sulla porta 5683 che andrà ad effettuare una richiesta GET alla risorsa ```/Button```: verrà quindi stampata la risposta sulla shell.

