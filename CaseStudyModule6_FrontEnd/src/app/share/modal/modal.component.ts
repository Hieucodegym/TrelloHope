import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";
import {BoardService} from "../../service/board/board.service";
import {MemberService} from "../../service/member/member.service";
import {Member} from "../../model/member";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  board: Board = {
    title: '',
    owner: {
      id: -1,
    },
    columns: [],
  };
  userSearch: string = ``;
  userResult: User[] = [];
  members: User[] = [];
  membersDto: Member[] = [];

  constructor(public modalService: ModalService,
              private userService: UserService,
              private boardService: BoardService,
              private memberService: MemberService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  searchUsers() {
    if (this.userSearch != '') {
      this.userService.findUsersByKeyword(this.userSearch).subscribe(users => {
        this.userResult = users;
        this.cleanSearchResults();
      });
    } else {
      this.userResult = [];
    }
  }

  addMember(user: User) {
    this.members.push(user);
    this.userSearch = '';
    this.userResult = [];
  }

  private cleanSearchResults() {
    for (let i = 0; i < this.userResult.length; i++) {
      let result = this.userResult[i];
      let toBeDeleted = false;
      if (result.id == this.modalService.currentUser.id) {
        toBeDeleted = true;
      } else {
        for (let member of this.members) {
          if (result.id == member.id) {
            toBeDeleted = true;
            break;
          }
        }
      }

      if (toBeDeleted) {
        this.userResult.splice(i, 1);
        i--;
      }
    }
  }

  removeMember(memberIndex: number) {
    this.members.splice(memberIndex, 1);
  }

  createNewBoard() {
    this.modalService.close();
    //create new board
    this.board.owner.id = this.modalService.currentUser.id;
    this.boardService.addNewBoard(this.board).subscribe(board => {
        this.board = board;
        this.loadDto();
      }
    )
  }

  private loadDto() {
    for (let member of this.members) {
      let memberDto: Member = {
        board: this.board,
        canEdit: false,
        user: {
          id: member.id
        }
      }
      this.membersDto.push(memberDto)
    }
    this.addNewMembers();
  }

  private addNewMembers() {
    this.memberService.addNewMembers(this.membersDto).subscribe(() => {
      this.router.navigateByUrl(`/trello/boards/${this.board.id}`);
    })
  }
}
