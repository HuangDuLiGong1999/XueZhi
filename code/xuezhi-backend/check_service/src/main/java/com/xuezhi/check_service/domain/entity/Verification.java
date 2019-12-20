package com.xuezhi.check_service.domain.entity;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "verification")
public class Verification {
    @Id
    private String id;
    private String userId;
    private Binary verImage;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Binary getVerImage() {
        return verImage;
    }

    public void setVerImage(Binary verImage) {
        this.verImage = verImage;
    }
}
