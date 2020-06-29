package com.xuezhi.check_service.domain.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "administrator")
public class Administrator {
    @Id
    private String id;
    private String name;
    private String password;
    private String university;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Administrator)
        {
            Administrator admin = (Administrator) obj;
            return name.equalsIgnoreCase(admin.getName().trim()) && password.equalsIgnoreCase(admin.getPassword().trim());
        }
        return false;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }
}
