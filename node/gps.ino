#include <lorawan.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

//ble
#define SERVICE_UUID        "f6b53cfb-b2e3-4c26-983c-27373d096c74"
#define CHARACTERISTIC_UUID "08949d1c-a2a8-473a-b531-e0e107870a37"

//gps
SoftwareSerial ss;
TinyGPSPlus gps;

//ABP Credentials 
const char *devAddr = "2f30b360";
const char *nwkSKey = "122d29e20b2ca3a50000000000000000";
const char *appSKey = "0000000000000000d1442e06ff47f91e";

const unsigned long interval = 10000;    // 10 s interval to send message
unsigned long previousMillis = 0;  // will store last time message sent

char myStr[1000];
char myStr2[1000];
char outStr[255];
String gpss="";
byte recvStatus = 0;
String pesan = "";
float latit;
float longi;

const int ledPin =  32;
const sRFM_pins RFM_pins = {
  .CS = 2,
  .RST = 15,
  .DIO0 = 14,
  .DIO1 = 12,
  .DIO2 = 25,
  .DIO5 = 27,
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();

      if (value.length() > 0) {
        Serial.println("*********");
        Serial.print("New value: ");
        for (int i = 0; i < value.length(); i++){
          Serial.print(value[i]);
          pesan+=String(value[i]);
        }
        Serial.println();
        Serial.println("*********");
      }

      pesan="New Message : "+pesan;
      pesan.toCharArray(myStr2,pesan.length()+1);
      Serial.print("Sending: ");
      Serial.println(myStr2);
    
      lora.sendUplink(myStr2, strlen(myStr2), 0);

      recvStatus = lora.readData(outStr);
      if(recvStatus) {
        Serial.println(outStr);
      } 
  
      // Check Lora RX
      lora.update();
      pesan="";
    }
};

void sendgps(){
  gpss+="Latitude: "+String(latit,6)+";Longitude: "+String(longi,6);
  gpss.toCharArray(myStr,gpss.length()+1);

  Serial.print("Sending: ");
  Serial.println(myStr);
    
  lora.sendUplink(myStr, strlen(myStr), 0);

  recvStatus = lora.readData(outStr);
  if(recvStatus) {
  Serial.println(outStr);
  } 
  
  // Check Lora RX
  lora.update();
  gpss="";
}

/*void ble(){
  if (pesan == "led_on"){
    digitalWrite(ledPin, HIGH);
    delay(100);
    digitalWrite(ledPin, LOW);    
    pesan = "";
  }
  else {
    pesan = "";
  }  
}*/

void datagps(){
  while (ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      Serial.print("Latitude= "); 
      latit = gps.location.lat();
      Serial.print(latit, 6);
      Serial.print(" Longitude= ");
      longi = gps.location.lng();
      Serial.println(longi, 6);
    }
  }
}

void setup() {
  // Setup loraid access
  Serial.begin(115200);
  ss.begin(9600, SWSERIAL_8N1, 17, 16);

  delay(2000);
  if(!lora.init()){
    Serial.println("RFM95 not detected");
    delay(5000);
    return;
  }

  // Set LoRaWAN Class change CLASS_A or CLASS_C
  lora.setDeviceClass(CLASS_A);

  // Set Data Rate
  lora.setDataRate(2);

  // set channel to random
  lora.setChannel(MULTI);
  
  // Put ABP Key and DevAddress here
  lora.setNwkSKey(nwkSKey);
  lora.setAppSKey(appSKey);
  lora.setDevAddr(devAddr);

  Serial.println("Starting BLE work!");
  BLEDevice::init("Long name works now");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );
                                      
  pCharacteristic->setCallbacks(new MyCallbacks());
  pCharacteristic->setValue("Hello World says Neil");
  pService->start();
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");  
  
  pinMode(ledPin, OUTPUT);
}

void loop() {
  //ble();
  datagps();
  if(millis() - previousMillis > interval) {
    previousMillis = millis();
    sendgps();  
  } 
  delay(10);
}
