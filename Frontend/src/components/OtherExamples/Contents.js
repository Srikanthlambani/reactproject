import React from 'react'
import { useParams } from 'react-router-dom'
export default function Contents() {
    const {id} = useParams();
  return (
    <div>
      CONTENTS SHOWN - {id}
    </div>
  )
}
