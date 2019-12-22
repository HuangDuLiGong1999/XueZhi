package com.xuezhi.check_service.adapter.in;

import com.xuezhi.check_service.application.ReportApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
//@CrossOrigin
public class NotificationController {
    private ReportApplication reportApplication;

    @Autowired
    public NotificationController(ReportApplication reportApplication){
        this.reportApplication = reportApplication;
    }

    @GetMapping("/notifications/questions/{email}/{title}")
    public void notifyQuestion(@PathVariable("email") String email, @PathVariable("title") String title) throws IOException {
        reportApplication.sendDeleteNotification("question", email, title);
    }

    @GetMapping("/notifications/answers/{email}/{title}")
    public void notifyAnswer(@PathVariable("email") String email, @PathVariable("title") String title) throws IOException{
        reportApplication.sendDeleteNotification("answer", email, title);
    }

    @GetMapping("/notifications/id/{email}")
    public void notifyId(@PathVariable("email") String email) throws IOException {
        reportApplication.sendBanNotification(email);
    }
}
