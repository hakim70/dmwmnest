import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from '../user/entities/user.entity';
import { SignupDto } from '../auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Inscription d'un nouvel utilisateur
   * @param signupDto - Données fournies par l'utilisateur pour l'inscription
   */
  async signup(signupDto: SignupDto): Promise<void> {
    const { name, username, email, password, age, gender, role } = signupDto;

    // Vérifiez si un utilisateur avec cet e-mail ou nom d'utilisateur existe déjà
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new HttpException(
        'Nom d\'utilisateur ou adresse e-mail déjà utilisée.',
        HttpStatus.CONFLICT,
      );
    }

    try {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création d'un nouvel utilisateur
      const newUser = this.userRepository.create({
        name, 
        username,
        email,
        password: hashedPassword,
        age: age ?? null, // Si 'age' n'est pas fourni, mettre 'null'
        gender: gender || 'u',
        role: role || Role.USER, // Rôle par défaut: USER
      });

      // Sauvegarde de l'utilisateur dans la base de données
      await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      throw new HttpException(
        'Échec de l\'inscription. Veuillez réessayer.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Connexion de l'utilisateur
   * @param username - Nom d'utilisateur
   * @param password - Mot de passe
   */
  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
