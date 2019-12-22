package com.xuezhi.check_service.adapter.in;

import com.xuezhi.check_service.application.ReportApplication;
import com.xuezhi.check_service.domain.entity.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin
@RestController
public class ReportController {
    private ReportApplication reportApplication;

    @Autowired
    public ReportController(ReportApplication reportApplication){
        this.reportApplication = reportApplication;
    }

    @PostMapping("/reports")
    public void addReport(@RequestParam String type, @RequestParam String questionId, @RequestParam String authorId){
        reportApplication.addReport(type, questionId, authorId);
    }

    @GetMapping("/reports")
    public List<Report> getReports(){
        return reportApplication.getReports();
    }

    @DeleteMapping("/reports/{id}")
    public void deleteReport(@PathVariable("id") String id){
        reportApplication.deleteReport(id);
    }
}
