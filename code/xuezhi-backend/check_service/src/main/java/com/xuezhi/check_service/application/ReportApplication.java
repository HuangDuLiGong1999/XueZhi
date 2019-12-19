package com.xuezhi.check_service.application;

import com.xuezhi.check_service.domain.entity.Report;
import com.xuezhi.check_service.domain.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Component
public class ReportApplication {
    private ReportRepository reportRepository;

    @Autowired
    public ReportApplication(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    public void addReport(String type, String questionId, String authorId){
        reportRepository.addReport(type, questionId, authorId);
    }

    public List<Report> getReports(){
        return reportRepository.getReports();
    }

    public void deleteReport(String id){
        reportRepository.deleteReport(id);
    }

    public void sendDeleteNotification(String type, String email, String title) throws IOException {
        String url;
        if (type.equals("question")){
            url = "http://localhost:8083/notifications/questions/" + email + "/" + title;
        }else {
            url = "http://localhost:8083/notifications/answers/" + email + "/" + title;
        }
        sendDeleteEmail(url);
    }

    public void sendBanNotification(String email) throws IOException{
        URL restURL= new URL("http://localhost:8083/notifications/id/" + email);
        HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
        conn.setRequestMethod("GET"); // POST GET PUT DELETE
        conn.setRequestProperty("Accept", "application/json");
        InputStream inputStream = conn.getInputStream();
    }

    private void sendDeleteEmail(String url) throws IOException {
        URL restURL = new URL(url);
        HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
        conn.setRequestMethod("GET"); // POST GET PUT DELETE
        conn.setRequestProperty("Accept", "application/json");
        InputStream inputStream = conn.getInputStream();
    }
}
