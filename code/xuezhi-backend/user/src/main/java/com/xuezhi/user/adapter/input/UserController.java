package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import com.xuezhi.user.domain.entity.User;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@CrossOrigin(origins = "http://localhost:8085/")
@RequestMapping(value="/users")
public class UserController {

    private UsersApplication usersApplication;

    @Autowired
    public UserController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }


    @PostMapping
    public boolean addUser(@RequestParam String email, @RequestParam String password){
        usersApplication.addUser(email,password);
        return true;
    }


    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") String id){
        return usersApplication.getUserById(id);
    }

    @PutMapping("/information")
    public boolean updateUser(@RequestParam String id, @RequestParam String name, @RequestParam int age, @RequestParam String sex, @RequestParam String signature){
        //TODO
        System.out.println(id);
        usersApplication.updateUser(id, name, age, sex, signature);
        return true;
    }

    @PutMapping("/avatar")
    public boolean setAvatar(@RequestParam String id, @RequestParam MultipartFile multipartFile){
        //todo
        usersApplication.setAvatar(id, multipartFile);
        return true;
    }

    @GetMapping(value = "/avatar/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] avatar(@PathVariable("id") String id){
        return usersApplication.getAvatar(id);
    }

    @PostMapping("/checkcode")
    public String sendModifyMail(@RequestParam String id) throws IOException {
        return usersApplication.sendModifyMail(id);
    }

    @PutMapping("/password")
    public boolean modifyPassword(@RequestParam String id, @RequestParam String password){
        usersApplication.modifyPassword(id, password);
        return true;
    }

}
