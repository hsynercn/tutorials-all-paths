# Section 6: Nest Architecture: Organizing Code with Modules

We will use the Computer, CPU, power supply, hard drive analogy to explain modules.

We will create a new project:

```cmd
nest new nestjs-dependency-injection
```

We will create the modules with cli commands:

```cmd
nest g module computer
nest g module cpu
nest g module disk
nest g module power
```

After that we will create the services:

```cmd
nest g service cpu
nest g service power
nest g service disk
```

Lastly we need controller:

```cmd
nest g controller computer
```

When we create a new module automatically we are getting private providers for each module. To open up these services we could add this to module ts:

```ts
import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}
```

To import it:

```ts
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}
```

After this step we can consume the power service in cpu service:

```ts
import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number) {
    console.log('Drawing 10 watts of power from PowerService');
    this.powerService.supplyPower(10);
    return a + b;
  }
}
```

