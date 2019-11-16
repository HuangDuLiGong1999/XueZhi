package com.xuezhi.mail.controller;

import com.xuezhi.mail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Random;

@CrossOrigin
@Controller
public class MailController {

    @Autowired
    private MailService mailService;

    @RequestMapping("/getCheckCode")
    @CrossOrigin
    @ResponseBody
    public String getCheckCode(String email)
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
}