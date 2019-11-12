package com.xuezhi.endpoint.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {
    @Autowired
    JavaMailSender jms;

    @GetMapping(value="/send")
    public String send(){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("1073130610@qq.com");
        mailMessage.setTo("865150663@qq.com");
        mailMessage.setSubject("测试邮件");
        mailMessage.setText("Hello World");
        jms.send(mailMessage);
        return "1";
    }
}
