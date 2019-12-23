package com.xuezhi.mail.controller;

import com.xuezhi.mail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
//@CrossOrigin
public class MailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/checkcode/{email}")
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

    @GetMapping("/notifications/questions/{email}/{title}")
    public boolean sendNoQuestion(@PathVariable("email") String email, @PathVariable("title") String title){
        String message = "您所提的" + title + "问题已被删除！";
        System.out.println(message);
        try {
            mailService.sendSimpleMail(email, "学·知通知",message);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @GetMapping("/notifications/answers/{email}/{title}")
    public boolean sendNoAnswer(@PathVariable("email") String email, @PathVariable("title") String title){
        String message = "您所作的在" + title + "问题下的回答已被删除！";
        try {
            mailService.sendSimpleMail(email, "学·知通知",message);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @GetMapping("/notifications/id/{email}")
    public void sendNoId(@PathVariable("email") String email){
        String message = "您的学·知账号" + email + "已被封禁！";
        mailService.sendSimpleMail(email, "学·知通知",message);
    }
}
