package com.xuezhi.check_service.domain.repository;

import com.xuezhi.check_service.domain.entity.Verification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VerificationRepository {
    //添加验证信息
    void addVerification(String userId, MultipartFile multipartFile);

    //查看验证信息
    List<Verification> getVerification();

    //删除验证信息
    void deleteVerification(String id);
}
