package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Question;
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

    @Autowired
    private QARepositor qaRepositor;

    public boolean addReport(String type, String questionId, String authorId){
        Report report;
        if (type.equals("question")){
            report = reportRepositor.findReportByQuestionId(questionId);
            if (report != null && report.getType().equals("answer")){
                report = null;
            }
        }
        else {
            report = reportRepositor.findReportByQuestionIdAndAuthorId(questionId, authorId);
        }
        if (report == null){
            Question temp = qaRepositor.findQuestionByQuestionId(questionId);
            if((!type.equals("question") &&!type.equals("answer")|| temp == null|| authorId.equals("")))
                return false;
            Report creport = new Report(type, questionId, authorId, 1);
            reportRepositor.save(creport);
            return true;
        }
        else {
            Question temp = qaRepositor.findQuestionByQuestionId(questionId);
            if((!type.equals("question") &&!type.equals("answer")|| temp == null|| authorId.equals("")))
                return false;
            int count = report.getCount();
            report.setCount(++count);
            reportRepositor.save(report);
            return true;
        }
    }

    public List<Report> getReports(){
        return reportRepositor.findAll();
    }

    public boolean deleteReport(String id){
        Report temp = reportRepositor.findReportById(id);
        if(temp==null)
            return false;
        else
        {
            reportRepositor.deleteReportById(id);
            return true;
        }
    }

}
