package com.example;

public interface ExternalApi {

    String getData();

    String getDataById(String id);

    void sendData(String data);
}
