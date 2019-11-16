package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value="/login")
public class LoginController {
    private UsersApplication usersApplication;

    @Autowired
    public LoginController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }

    @PostMapping("/check")
    public boolean checkUser(@RequestParam String email, @RequestParam String password){
        return usersApplication.getUserByEmailAndPassword(email, password);
    }
}
