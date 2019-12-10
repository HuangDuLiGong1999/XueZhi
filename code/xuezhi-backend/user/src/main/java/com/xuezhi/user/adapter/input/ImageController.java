package com.xuezhi.user.adapter.input;

import com.xuezhi.user.domain.entity.Image;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
public class ImageController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/file/uploadImage")
    public String uploadImage(@RequestParam(value = "image") MultipartFile file){

        String fileName = file.getOriginalFilename();
        String url = "";
        try {
            Image image = new Image();
            image.setName(fileName);
            image.setCreatedTime(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            Image savedFile = mongoTemplate.save(image);
            url = "http://localhost:8080/file/image/"+ savedFile.getId();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return url;
    }

    @GetMapping(value = "/file/image/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] image(@PathVariable String id){
        byte[] data = null;
        Image image = mongoTemplate.findById(id, Image.class);
        System.out.println("123");
        if (image != null){
            data = image.getContent().getData();
        }
        return data;
    }


}
