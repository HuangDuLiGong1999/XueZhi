package com.xuezhi.mail.controller;

import com.xuezhi.mail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@CrossOrigin
@RestController
public class MailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/checkcode/{email}")
    @CrossOrigin
    public String getCheckCode(@PathVariable("email") String email)
    {
        String checkCode = String.valueOf(new Random().nextInt(799999) + 100000);
        String message = "您的注册验证码为："+checkCode;
        try {
            mailService.sendSimpleMail(email, "注册验证码", message);
        }catch (Exception e){
            return "";
        }
        return checkCode;
    }

    @GetMapping("/password_checkcode/{email}")
    @CrossOrigin
    public String getUpdateCheckCode(@PathVariable("email") String email){
        String checkCode = String.valueOf(new Random().nextInt(799999) + 100000);
        String message = "温馨提示:您的学·知账户" + email + "正在进行修改密码的操作，如果不是您所进行的操作，请注意账号可能已被盗取。您的修改密码的验证码为："+checkCode;
        try {
            mailService.sendSimpleMail(email, "修改密码验证码", message);
        }catch (Exception e){
            return "";
        }
        return checkCode;
    }
}
