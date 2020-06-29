package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Report;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportRepositor extends MongoRepository<Report, String> {
    boolean deleteReportById(String id);
    Report findReportById(String id);
    Report findReportByQuestionId(String questionId);
    Report findReportByQuestionIdAndAuthorId(String questionId, String authorId);

}
