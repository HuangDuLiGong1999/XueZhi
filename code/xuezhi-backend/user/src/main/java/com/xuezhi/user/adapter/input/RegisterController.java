package com.xuezhi.user.adapter.input;

import com.xuezhi.user.application.UsersApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping(value="/register")
public class RegisterController {
    private UsersApplication usersApplication;

    @Autowired
    public RegisterController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }


    @PostMapping("/checkcode")
    public String checkAndSendMail(@RequestParam String email) throws IOException {
        return usersApplication.checkAndSendMail(email);
    }


    @PostMapping
    public void addUser(@RequestParam String email, @RequestParam String password)
    {
       usersApplication.addUser(email, password);
    }

}
