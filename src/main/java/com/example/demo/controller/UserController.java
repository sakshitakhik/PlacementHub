package com.example.demo.controller;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.User;
import com.example.demo.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:4200")
@RestController


public class UserController {
	private final UserService userService;
	public UserController(UserService userService) {
		this.userService=userService;
		
	}
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userService.saveUser(user);
		
	}
	@GetMapping("/users")
	public List<User>getAllUsers(){
		return userService.getAllUsers();
	}
	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable ("id") Long id) {
		return userService.getUserById(id);
	}
	@PutMapping("/users/{id}")
	public User updateUser(@PathVariable("id") Long id,@RequestBody User user){
		return userService.updateUser(id,user);
	}
	
	@DeleteMapping("/users/{id}")
	public String deleteUser(@PathVariable("id")Long id) {
		userService.deleteUser(id);
		return "User deleted successfully";
	}

	
	@PostMapping("/login")
	public User login(@RequestBody User user) {

	    return userService.login(
	        user.getEmail(),
	        user.getPassword()
	    );
	}
}
