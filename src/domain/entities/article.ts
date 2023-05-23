import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { User, Comment, Favorite } from './';

@Entity({
  schema: DatabaseSchema.article,
})
export class Article extends BaseEntity {
  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  tags: string[];

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.article)
  favorites: Favorite[];
}
