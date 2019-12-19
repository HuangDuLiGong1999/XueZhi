package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Report;
import com.xuezhi.check_service.domain.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;


@Component
@Repository
public class ReportRepositoryImpl implements ReportRepository {

    @Autowired
    private ReportRepositor reportRepositor;

    public void addReport(String type, String questionId, String authorId){
        Report report;
        if (type.equals("question")){
            report = reportRepositor.findReportByQuestionId(questionId);
        }
        else {
            report = reportRepositor.findReportByQuestionIdAndAuthorId(questionId, authorId);
        }
        if (report == null){
            Report creport = new Report(type, questionId, authorId, 1);
            reportRepositor.save(creport);
        }
        else {
            int count = report.getCount();
            report.setCount(++count);
            reportRepositor.save(report);
        }
    }

    public List<Report> getReports(){
        return reportRepositor.findAll();
    }

    public void deleteReport(String id){
        reportRepositor.deleteReportById(id);
    }

}
