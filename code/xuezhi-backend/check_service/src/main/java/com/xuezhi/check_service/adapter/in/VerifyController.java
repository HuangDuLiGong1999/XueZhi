package com.xuezhi.check_service.adapter.in;

import com.xuezhi.check_service.application.VerificationApplication;
import com.xuezhi.check_service.domain.entity.Verification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/verification")
public class VerifyController {
    private VerificationApplication verificationApplication;

    @Autowired
    public VerifyController(VerificationApplication verificationApplication){
        this.verificationApplication = verificationApplication;
    }

    @PostMapping
    public void addVerification(@RequestParam String userId, @RequestParam MultipartFile multipartFile, @RequestParam String intention, @RequestParam String remark){
        verificationApplication.addVerification(userId, multipartFile,intention,remark);
    }

    @GetMapping
    public List<Map<String,Object>> getVerification(){
        return verificationApplication.getVerification();
    }

    @GetMapping(value = "/images/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getVerImage(@PathVariable("id") String id){
        return verificationApplication.getVerImage(id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteVerification(@PathVariable("id") String id){
        verificationApplication.deleteVerification(id);
    }
}
