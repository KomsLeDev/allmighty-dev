package com.komsy.analyzer.controller;
import com.komsy.analyzer.dto.ChatRequest;
import com.komsy.analyzer.dto.ChatResponse;
import com.komsy.analyzer.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String answer = chatService.answer(request.getMessage());
        return ResponseEntity.ok(new ChatResponse(answer));
    }
}

