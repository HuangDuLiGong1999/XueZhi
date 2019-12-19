package com.xuezhi.check_service.domain.repository;

import com.xuezhi.check_service.domain.entity.Report;

import java.util.List;

public interface ReportRepository {
    //添加举报
    void addReport(String type, String questionId, String authorId);
    //查看举报
    List<Report> getReports();

    //删除举报
    void deleteReport(String id);
}
