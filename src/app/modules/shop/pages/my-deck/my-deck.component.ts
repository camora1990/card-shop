import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Card } from '../../../core/domain/entities/card.model';
import { LoadingService } from '../../../core/services/loading.service';
import { CardGroupBy } from 'src/app/modules/core/domain/entities/cardGroupBy.model';
import { tap } from 'rxjs';
import TransformCard from '../../../core/utils/transformCards';

@Component({
  selector: 'app-my-deck',
  templateUrl: './my-deck.component.html',
  styleUrls: ['./my-deck.component.scss']
})
export class MyDeckComponent implements OnInit {

  groupCards: CardGroupBy[] = [];
  constructor(private $user:UserService,private $loading:LoadingService) { }

  ngOnInit(): void {
    this.$loading.loading.next(true)
    this.$user.getUser(this.$user.currenUser?.uid!)
    .pipe(tap((res)=> this.groupCards=TransformCard.transformData(res[0].deck)))
    .subscribe({
      next:()=>{
        this.$loading.loading.next(false)

      }
    })
  }

}
