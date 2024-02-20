# Complete Godot 2D Develop Your Own 2D Games Using Godot 4

## Section 02 Speedy Saucer

### 8. Section Intro - Speedy Saucer

We will create a simple game called Speedy Saucer. We will try to keep saucer in the screen and avoid the obstacles.

### Project Setup

We will create an empty 2D scene.

We will get the assets from the kenney.nl website.

We will install the Space Shooter Redux asset from this [link](https://kenney.nl/assets/space-shooter-redux).

We will use:

- darkPurple.png
- purple.png
- ufoGreen.png

We will create a new TextureRect node we will add the darkPurple.png texture to it. We will set the stretch mode to tile to make the texture repeat itself. By this way resolution will not be a problem.

### 10. Nodes and Scenes

Nodes

- Fundamental building blocks of Godot
- Different nodes have different properties
- Nodes are grouped together to form a scene
- Nodes in a scene are organized in a tree structure

Scenes

- Grouped of nodes that organized as a tree
- Can be saved as a file
- Scenes are reusable
- A Godot game is made out of scenes

```mermaid
graph LR
  A[Start Menu] --> B 
  B[Game] --> C[Win Screen]
  B[Game] --> D[Game Over]
```

For the player node we will add a Rigidbody2D node. Also we will add a Sprite2D under the player node. We will add the ufoGreen.png texture to the sprite.

### 11. Rigidbody2D and Collision Shapes

Godot provides a physics engine. We can use it to simulate the physics in our game.

We can define the collision shapes for the nodes.

Godot provides 4 different types of collision shapes:

- Rigidbody2D
  - Uses Godot's physics engine
  - Needs a collision shape
  - CollisionSpace2D node

We will add a CollisionShape2D node under the player node. We will set the radius to 45 px, this will cover the whole saucer.

Important Note: Never set the size from Transform property. Always use the size property of the CollisionShape2D node.

### 12. Instancing Scenes

Instancing

- A scene is a tree of nodes
- We can split our game into scenes
- Instancing let's use scenes in other scenes

We can link the player scene to the main scene. We can use the link icon in the player scene. We can add the player scene to the main scene.

### 13. Editing Instances

If we want to edit the player scene we can click the edit button in the main scene. We can edit the player scene in the main scene. All copies of the player scene will be updated.

If we want to edit individual instances we can click the instance and click the edit button. We can edit the instance without affecting the other instances.

We can enable children property to edit the children of the instance.

### 14. Parent and Child Relationships

If we delete a parent node all the children will be deleted.

Position is relative to the parent node. If we move the parent node all the children will move with it.

### 15. Draw Order and Z Index

When we add a node it will be rendered with the default z index. We can change the z index from the inspector.

Higher z index will be rendered on top of the lower z index.

We can set a negative z index to render the node behind the other nodes.

### 16. Into To Scripting

Scripting:

- Scripts are files containing code.
- A node by itself has limited behavior.
- You will attach scripts to nodes to extend the default behavior.
- Example: Sprite2D node displays a texture by default. If you want the sprite to follow the mouse cursor, you would attach a script to it and add the movement code.

Scripting Languages of Godot

- GDScript
  - Python-like language
  - Designed for Godot
  - Easy to learn
  - Fast to write
  - Optimized for Godot
- C#
  - Popular language
  - Fast
  - Large community
  - Good for large projects
- C/C++
  - Fast
  - Low-level
  - Good for performance-critical code

You can use GDScript for most of the tasks. If you need performance-critical code you can use C# or C++.

We can add a script to player scene.

### 17. Functions and Printing Text

We can add a new script to the player scene. We can add a new function to the script. It can print a text to the console from the function.

```gd
extends RigidBody2D

func _ready():
    print("Hello, World!")
```

### 18. Number Operations and More Printing

We can do some basic number operations in GDScript.

```gd
extends RigidBody2D

func _ready():
    print(1 + 1)
    print(2 - 1)
    print(2 * 2)
    print(4 / 2)
    print(5 % 2)
    print(2 ** 3)
```

### 19. Introducing Variables

Variables store data.

Types of variables in GDScript:

- Integer
- Float
- String
- Boolean

var is used to define a variable.

```gd
var myInteger = 5
var myFloat = 5.5
var myString = "Hello, World!"
var myBoolean = true
```

### 20. Functions Parameters and Arguments

We can define functions with parameters.

```gd
extends RigidBody2D


# Called when the node enters the scene tree for the first time.
func _ready():
  test(10)

func test(param1):
  print(param1*2)
```

### 21. Vector2 and apply_impulse()

Vector2 is a built-in type in Godot. It is used to store 2D vectors.

We can use apply_impulse() function to apply a force to the RigidBody2D node.

```gd
extends RigidBody2D

# Called when the node enters the scene tree for the first time.
func _ready():
	apply_impulse(Vector2(25, -10))
```

Apply impulse is useful when we want to apply a force to the object once.

### 22. Processing and apply_force()

FPS (Frames Per Second)

- Higher FPS means game is running smoother
- V-Sync: FPS is synchronized with the monitor's refresh rate
- Godot is v-sync enabled by default

If we want to add a force to the object every frame we can use apply_force() function.

```gd
extends RigidBody2D


# Called when the node enters the scene tree for the first time.
func _ready():
	apply_impulse(Vector2(-250, 0))
	
func _process(delta):
	print(Engine.get_frames_per_second())
	apply_force(Vector2(25, 0))
```

If we run the game with V-Sync enabled we will get 60 FPS. If we disable the V-Sync we will get 1000+ FPS for this simple game.

If we want to prevent this force being applied every frame we can use another method _physics_process().

```gd
extends RigidBody2D


# Called when the node enters the scene tree for the first time.
func _ready():
	apply_impulse(Vector2(-200, 0))
	
func _process(delta):
	pass
	
func _physics_process(delta):
	apply_force(Vector2(25, 0))
```

This approach will provide a consistent behavior for the game.

### 23. If Statement and Comparison Operators

If statement is used to execute a block of code if the condition is true.

Sorry guys, I am writing if statements since 2016. I will skip this part.

### 24. Getting Input

We can get the input from the user with the Input class.

```gd
extends RigidBody2D


# Called when the node enters the scene tree for the first time.
func _ready():
	pass
	
func _process(delta):
	pass
	
func _physics_process(delta):
	var force = 1000
	if Input.is_action_pressed("move_right"):
		apply_force(Vector2(force, 0))
	if Input.is_action_pressed("move_left"):
		apply_force(Vector2(-force, 0))
	if Input.is_action_pressed("move_up"):
		apply_force(Vector2(0, -force))
	if Input.is_action_pressed("move_down"):
		apply_force(Vector2(0, force))
```

We can add the move_right, move_left, move_up, move_down actions from the project settings.

<img width="882" alt="image" src="https://github.com/hsynercn/tutorials-all-paths/assets/28985966/b5a32386-2f26-4793-88fc-fff16b7e5701">

### 25. Variable Scope

Variable scope is the area where the variable is accessible. Global variables are accessible from anywhere in the script. Local variables are only accessible from the function they are defined.

Function scope is used before the global scope. If we define a variable with the same name in the function scope it will override the global variable.

### 26. Function Return Values

We can return a value from a function.

```gd
func test(param1):
  return param1*2
```

### 27. Following The Player With Camera2D

We can add a Camera2D node to player node to follow the player.

We can add smoothing to the camera to make the movement smoother and drag to make the camera follow the player with a delay.

### 28. Making The Maze

We will use a new node type, Area2D. It is used to detect the collision with other nodes.

Area2D

- Does not have collision resolution
- Can only detect other physics bodies
- We use it to detect collision with other physics bodies without affecting them

Under Area2D we will add a CollisionPolygon2D and Polygon2D nodes. We will add texture to the Polygon2D node with a repeating enabled flag. In next stage we will use the collision polygon to detect the collision with the player.

### 29. Using Signals To Reset The Game

