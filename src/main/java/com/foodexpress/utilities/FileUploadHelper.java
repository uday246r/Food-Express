package com.foodexpress.utilities;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {


    public static List<String> uploadFiles(MultipartFile[] files) throws IOException {
        List<String> fileNames = new ArrayList<>();

        // Define the upload directory
        String uploadDir = "src/main/resources/static/images_RestaurantM";
        File directory = new File(uploadDir);

        // Create directory if it does not exist
        if (!directory.exists()) {
            directory.mkdirs();
        }

        for (MultipartFile file : files) {
            // Generate a unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File destinationFile = new File(directory, fileName);

            // Debugging log
            System.out.println("Saving file to: " + destinationFile.getAbsolutePath());

            // Copy file to the directory
            try (FileOutputStream fos = new FileOutputStream(destinationFile)) {
                fos.write(file.getBytes());
            }

            fileNames.add(fileName);
        }

        return fileNames;
    }

    public static String uploadFile(MultipartFile file)
    {

        // Use a project-relative path instead of a machine-specific absolute path
        final String UPLOAD_DIR = "src/main/resources/static/images_DeliveryM";

        // Ensure the upload directory exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        Path filePath = Paths.get(directory.getPath() + File.separator + uniqueFilename);

        try {
			Files.copy(file.getInputStream(), filePath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return uniqueFilename;

        
    }
}
